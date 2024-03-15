import { GSIEvents } from '../../util/constants';
import { logger } from '../config/logger';
import { GlobalEmitter } from '../lib/emitter';
import { Team } from '../model/team';
import { BombSites, RoundPhase, RoundWinType, SideTeam } from '../types/common';
import {
    IBomb,
    IData,
    IMap,
    IPlayer,
    IPlayerState,
    IPlayerStats,
    IPlayerWeapon,
    IRound,
    IRoundHistory,
    ITeam
} from '../types/data';
import {
    GSIAllPlayers,
    GSIBomb,
    GSIMap,
    GSIPhaseCountdowns,
    GSIPlayer,
    GSIPlayerState,
    GSIPlayerStats,
    GSIRaw,
    GSIRound,
    GSIRoundWins,
    GSITeam,
    GSIWeapon,
    GSIWeapons
} from '../types/gsi';

const mapsBombSites: { [mapName: string]: (position: number[]) => 'A' | 'B' } = {
    de_mirage: (position) => (position[1] < -600 ? 'A' : 'B'),
    de_cache: (position) => (position[1] > 0 ? 'A' : 'B'),
    de_overpass: (position) => (position[2] > 400 ? 'A' : 'B'),
    de_nuke: (position) => (position[2] > -500 ? 'A' : 'B'),
    de_dust2: (position) => (position[0] > -500 ? 'A' : 'B'),
    de_inferno: (position) => (position[0] > 1400 ? 'A' : 'B'),
    de_vertigo: (position) => (position[0] > -1400 ? 'A' : 'B'),
    de_train: (position) => (position[1] > -450 ? 'A' : 'B'),
    de_ancient: (position) => (position[0] < -500 ? 'A' : 'B'),
    de_anubis: (position) => (position[0] > 0 ? 'A' : 'B')
};

export class GsiService {
    /**
     * Current state of the game
     */
    private current?: IData = undefined;
    /**
     * Last state of the game
     */
    private last?: IData = undefined;
    /**
     * Number of rounds in game
     */
    private totalRounds = 24;
    /**
     * Number of rounds in overtime
     */
    private totalOvertimeRounds = 6;
    /**
     *
     */
    private team1?: Team;
    /**
     *
     */
    private team2?: Team;
    /**
     *
     */
    private roundsDamage: {
        round: number;
        players: {
            steamId: string;
            damage: number;
        }[];
    }[] = [];

    private parseMap = (map: GSIMap): IMap => {
        return {
            name: map.name,
            phase: map.phase
        };
    };

    private parseBomb = (map: string, bomb?: GSIBomb): IBomb | undefined => {
        if (!bomb) return;

        const bombState = bomb.state;
        const bombCountdown = Number(bomb.countdown) || undefined;
        const bombPosition = bomb.position.split(', ').map((pos) => Number(pos));
        const isBombPlantingOrPlanted =
            bombState === 'planted' || bombState === 'defused' || bombState === 'defusing' || bombState === 'planting';

        return {
            state: bombState,
            countdown: bombCountdown,
            position: bombPosition,
            player: bomb.player,
            site: isBombPlantingOrPlanted ? this.parseBombSite(map, bombPosition) : undefined
        };
    };

    private parseBombSite = (map: string, bombPosition: number[]): BombSites | undefined => {
        if (map in mapsBombSites) {
            return mapsBombSites[map](bombPosition);
        }

        return;
    };

    private parseCurrentRound = (
        round: GSIRound | undefined,
        roundNumber: number,
        phaseCountdown: GSIPhaseCountdowns
    ) => {
        const currentRound: IRound = {
            number: 0,
            phase: 'over',
            event: 'over',
            countdown: 0
        };

        if (!round) return currentRound;

        currentRound.number = round.phase === 'over' ? roundNumber : roundNumber + 1;
        currentRound.phase = round.phase;
        currentRound.event = phaseCountdown.phase;
        currentRound.countdown = Number(phaseCountdown.phase_ends_in);
        currentRound.winner = round.win_team;

        return currentRound;
    };

    private parseRoundsHistory = (currentRoundNumber: number, roundsHistory: GSIRoundWins): IRoundHistory[] => {
        const rawRoundsHistory = Object.values(roundsHistory || []);
        const totalRawRoundsHistory = rawRoundsHistory.length;
        const currentRoundHistory = this.current?.rounds || [];
        const totalDataRoundsHistory = currentRoundHistory.length;

        if (totalRawRoundsHistory && totalDataRoundsHistory === totalRawRoundsHistory) return currentRoundHistory;

        let deltaRounds = 0;
        if (currentRoundNumber > this.totalRounds) {
            const roundsPlayedInOvertime = currentRoundNumber - this.totalRounds - 1;
            const overtimeNumber = Math.floor(roundsPlayedInOvertime / this.totalOvertimeRounds);

            deltaRounds = this.totalRounds + overtimeNumber * this.totalOvertimeRounds;
        }

        let indexRound = totalDataRoundsHistory;
        if (totalDataRoundsHistory >= this.totalRounds) {
            const deltaIndex = deltaRounds > this.totalRounds ? 1 : 0;
            indexRound = totalDataRoundsHistory - deltaRounds + deltaIndex;
        }

        logger.info({ totalDataRoundsHistory, totalRounds: this.totalRounds, deltaRounds, indexRound });

        for (let i = indexRound; i < totalRawRoundsHistory; i++) {
            const round = this.getRoundWinnner(Number(i) + deltaRounds + 1, rawRoundsHistory[i]);
            if (round) currentRoundHistory.push(round);
        }

        return currentRoundHistory;
    };

    private getRoundWinnner = (currentRound: number, roundContent: RoundWinType): IRoundHistory | null => {
        const roundWinnerInfos = roundContent?.split('_');
        const winnerSide = roundWinnerInfos[0].toUpperCase() as SideTeam;
        const winnerContent = roundWinnerInfos[2];

        return {
            round: currentRound,
            side: winnerSide,
            content: winnerContent
        };
    };

    private parsePlayers = (players: GSIAllPlayers): IPlayer[] =>
        Object.entries(players).map(([steamId, player]) => this.parsePlayer(steamId, player));

    private parsePlayer = (steamId: string, player: GSIPlayer): IPlayer => {
        const state = this.parsePlayerState(player.state);
        const stats = this.parsePlayerStats(player.match_stats);
        const weapons = this.parseWeapons(player.weapons);

        return {
            id: null,
            steamId,
            dead: state.health === 0,
            name: null,
            nickname: player.name,
            country: null,
            avatar: null,
            slot: player.observer_slot,
            side: player.team,
            state,
            stats,
            weapons,
            position: player.position.split(', ').map((pos) => Number(pos)),
            forward: player.forward.split(', ').map((pos) => Number(pos))
        };
    };

    private parsePlayerState = (playerState: GSIPlayerState): IPlayerState => {
        const {
            defusekit,
            round_kills,
            round_killhs,
            round_totaldmg,
            equip_value,
            flashed,
            smoked,
            burning,
            ...other
        } = playerState;

        return {
            ...other,
            defuse: defusekit || false,
            timeFlashed: flashed,
            timeSmoked: smoked,
            timeBurning: burning,
            roundKills: round_kills,
            roundKillsHS: round_killhs,
            roundDamage: round_totaldmg,
            equipmentValue: equip_value
        };
    };

    private parsePlayerStats = (playerStats: GSIPlayerStats): IPlayerStats => ({
        kills: playerStats?.kills || 0,
        assists: playerStats?.assists || 0,
        deaths: playerStats?.deaths || 0,
        mvps: playerStats?.mvps || 0,
        score: playerStats?.score || 0,
        adr: 0
    });

    private parseWeapons = (weapons: GSIWeapons): IPlayerWeapon[] => {
        return Object.values(weapons).map((weapon) => this.parseWeapon(weapon));
    };

    private parseWeapon = (weapon: GSIWeapon): IPlayerWeapon => ({
        name: weapon.name.split('weapon_')[1],
        skin: weapon.paintkit,
        type: weapon.type,
        active: weapon.state === 'active',
        ammo: weapon.ammo_clip,
        reserveAmmo: weapon.ammo_reserve
    });

    private parseTeams = (teamCT: GSITeam, teamT: GSITeam, players: IPlayer[]): { team1: ITeam; team2: ITeam } => {
        const isCTLeft = this.isCTLeftOrientation(players);

        const playersCT = players.filter(({ side }) => side === 'CT');
        const playersT = players.filter(({ side }) => side === 'T');

        const team1 = this.parseTeam(
            isCTLeft ? 'CT' : 'T',
            isCTLeft ? 'L' : 'R',
            isCTLeft ? teamCT : teamT,
            isCTLeft ? playersCT : playersT,
            isCTLeft ? this.team1 : this.team2
        );
        const team2 = this.parseTeam(
            isCTLeft ? 'T' : 'CT',
            isCTLeft ? 'R' : 'L',
            isCTLeft ? teamT : teamCT,
            isCTLeft ? playersT : playersCT,
            isCTLeft ? this.team2 : this.team1
        );

        return { team1, team2 };
    };

    private isCTLeftOrientation = (players: IPlayer[]): Boolean => {
        const playerT = Object.values(players).find(({ slot, side }) => slot !== undefined && side === 'T');
        const playerCT = Object.values(players).find(({ slot, side }) => slot !== undefined && side === 'CT');

        if (!playerT || !playerCT) return true;
        return playerCT.slot < playerT.slot;
    };

    private parseTeam = (
        side: SideTeam,
        orientation: 'L' | 'R',
        team: GSITeam,
        players: IPlayer[],
        extension?: any
    ): ITeam => ({
        id: extension?.id || null,
        side,
        orientation,
        name: extension?.name || team.name || side,
        logo: extension?.logo || null,
        country: extension?.country || null,
        score: team.score,
        serieScore: team.matches_won_this_series,
        lossBonus: team.consecutive_round_losses,
        timeoutsRemaining: team.timeouts_remaining,
        players
    });

    private parseDamages = (roundNumber: number, roundPhase: RoundPhase, players: IPlayer[]) => {
        if ((roundNumber === 1 && roundPhase === 'freezetime') || roundPhase === 'warmup') {
            this.roundsDamage = [];
        }

        let currentRoundDamage = this.roundsDamage.find((damage) => damage.round === roundNumber);
        if (!currentRoundDamage) {
            currentRoundDamage = {
                round: roundNumber,
                players: []
            };

            this.roundsDamage.push(currentRoundDamage);
        }

        currentRoundDamage.players = players.map(({ steamId, state }) => ({
            steamId: steamId,
            damage: state.roundDamage
        }));

        const roundDamage = this.roundsDamage.filter((d) => d.round < roundNumber);
        players.forEach((player) => {
            const playerRoundsDamage = roundDamage.map((d) => {
                const prd = d.players.find((pd) => pd.steamId === player.steamId);
                return prd ? prd.damage : 0;
            });

            const totalDamage = playerRoundsDamage.reduce((a, b) => a + b, 0);
            player.stats.adr = Math.floor(totalDamage / (roundNumber - 1)) || 0;
        });
    };

    private parseRaw(raw: GSIRaw): IData {
        const { map, round, phase_countdowns, allplayers, player, bomb } = raw;

        const parsedMap = this.parseMap(map);

        const parsedBomb = this.parseBomb(map.name, bomb);

        const parsedCurrentRound = this.parseCurrentRound(round, map.round, phase_countdowns);

        const parsedRoundsHistory = this.parseRoundsHistory(parsedCurrentRound.number, map.round_wins);

        const players = this.parsePlayers(allplayers);

        this.parseDamages(parsedCurrentRound.number, parsedCurrentRound.phase, players);

        const playerObserved = players.find(({ steamId }) => steamId === player?.spectarget);

        const { team1, team2 } = this.parseTeams(map.team_ct, map.team_t, players);

        return {
            map: parsedMap,
            bomb: parsedBomb,
            round: parsedCurrentRound,
            rounds: parsedRoundsHistory,
            team1,
            team2,
            observed: playerObserved
        };
    }

    // emit Events
    private emitEndRoundEvent = () => {
        const lastRoundWinner = this.last?.round.winner;
        const currentRoundWinner = this.current?.round.winner;
        if (lastRoundWinner || !currentRoundWinner) return;

        const team1 = this.current?.team1;
        const team2 = this.current?.team2;
        if (!team1 || !team2) return;

        const lastMapPhase = this.last?.map.phase;
        const currentMapPhase = this.current?.map.phase;
        const winnerTeam = team1.side === currentRoundWinner ? team1 : team2;

        GlobalEmitter.emit(GSIEvents['ROUND_END'], JSON.stringify(winnerTeam));
        if (currentMapPhase === 'gameover' && lastMapPhase !== 'gameover') {
            GlobalEmitter.emit(GSIEvents['MATCH_END'], JSON.stringify(winnerTeam));
        }
    };

    private emitBombEvent = () => {
        const lastBomb = this.last?.bomb;
        const currentBomb = this.current?.bomb;
        if (!lastBomb || !currentBomb) return;

        const lastBombState = lastBomb.state;
        const currentBombState = currentBomb.state;
        if (lastBombState === currentBombState) return;

        var bombEvent = '';
        if (lastBombState !== 'planting' && currentBombState === 'planting') {
            bombEvent = GSIEvents['BOMB_PLANT_START'];
        } else if (lastBombState === 'planting' && (currentBombState === 'carried' || currentBombState === 'dropped')) {
            bombEvent = GSIEvents['BOMB_PLANT_STOP'];
        } else if (lastBombState !== 'planted' && currentBombState === 'planted') {
            bombEvent = GSIEvents['BOMB_PLANTED'];
        } else if (lastBombState !== 'defusing' && currentBombState === 'defusing') {
            bombEvent = GSIEvents['BOMB_DEFUSE_START'];
        } else if (lastBombState === 'defusing' && currentBombState !== 'defusing') {
            bombEvent = GSIEvents['BOMB_DEFUSE_STOP'];
        } else if (lastBombState !== 'defused' && currentBombState === 'defused') {
            bombEvent = GSIEvents['BOMB_DEFUSED'];
        } else if (lastBombState !== 'exploded' && currentBombState === 'exploded') {
            bombEvent = GSIEvents['BOMB_EXPLODED'];
        }
        if (!bombEvent) return;

        const player = bombEvent === GSIEvents['BOMB_DEFUSE_START'] ? currentBomb.player : lastBomb.player;

        GlobalEmitter.emit(bombEvent, player);
    };

    private emitFreezetimeEvent = () => {
        const lastRoundEvent = this.last?.round.event;
        const currentRoundEvent = this.current?.round.event;
        if (!lastRoundEvent || !currentRoundEvent || lastRoundEvent === currentRoundEvent) return;

        var freezetimeEvent = '';
        if (lastRoundEvent !== 'freezetime' && currentRoundEvent === 'freezetime') {
            freezetimeEvent = GSIEvents['FREEZETIME_START'];
        } else if (lastRoundEvent === 'freezetime' && currentRoundEvent !== 'freezetime') {
            freezetimeEvent = GSIEvents['FREEZETIME_END'];
        }
        if (!freezetimeEvent) return;

        GlobalEmitter.emit(freezetimeEvent);
    };

    private emitTimeoutEvent = () => {
        const lastRoundEvent = this.last?.round.event;
        const currentRoundEvent = this.current?.round.event;
        if (!lastRoundEvent || !currentRoundEvent || lastRoundEvent === currentRoundEvent) return;

        var timeoutEvent = '';
        var team = undefined;
        if (currentRoundEvent.startsWith('timeout')) {
            timeoutEvent = GSIEvents['TIMEOUT_START'];
            team = currentRoundEvent === 'timeout_ct' ? 'teamCT' : 'teamT';
        } else if (lastRoundEvent.startsWith('timeout')) {
            timeoutEvent = GSIEvents['TIMEOUT_END'];
        }
        if (!timeoutEvent) return;

        GlobalEmitter.emit(timeoutEvent, team);
    };

    private emitMVPEvent = () => {
        const lastPlayersT1 = this.last?.team1.players || [];
        const lastPlayersT2 = this.last?.team2.players || [];
        const lastPlayers = lastPlayersT1.concat(lastPlayersT2);

        const currentPlayersT1 = this.current?.team1.players || [];
        const currentPlayersT2 = this.current?.team2.players || [];
        const currentPlayers = currentPlayersT1.concat(currentPlayersT2);

        const valveMVP = this.parseValveMVP(lastPlayers, currentPlayers);
        if (!valveMVP) return;

        const winnerSide = this.current?.round.winner;

        const winnerSidePlayers = currentPlayers.filter((player) => player.side === winnerSide);
        const impactMVP = winnerSidePlayers.sort((p1, p2) => {
            if (p1.state.roundDamage > p2.state.roundDamage) return -1;
            if (p1.state.roundDamage < p2.state.roundDamage) return 1;
            return 0;
        })[0];

        GlobalEmitter.emit(GSIEvents['IMPACT_MVP'], impactMVP);
        GlobalEmitter.emit(GSIEvents['VALVE_MVP'], valveMVP);
    };

    private parseValveMVP = (lastPlayers: IPlayer[], currentPlayers: IPlayer[]): IPlayer | undefined => {
        return (
            currentPlayers.find((player) => {
                const previousData = lastPlayers.find((previousPlayer) => previousPlayer.steamId === player.steamId);
                if (!previousData) return false;
                if (player.stats.mvps > previousData.stats.mvps) return true;
                return false;
            }) || undefined
        );
    };

    digest = (raw: GSIRaw) => {
        const data = this.parseRaw(raw);
        if (!this.last) this.last = data;
        this.current = data;

        // Emit Events
        this.emitEndRoundEvent();
        this.emitBombEvent();
        this.emitFreezetimeEvent();
        this.emitTimeoutEvent();
        this.emitMVPEvent();

        this.last = data;

        GlobalEmitter.emit(GSIEvents['RAW'], raw);
        GlobalEmitter.emit(GSIEvents['DATA'], data);
    };
}
