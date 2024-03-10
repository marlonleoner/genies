import { existsSync, promises, unlinkSync } from 'fs';
import path from 'path';

import { imagesFolder } from '../../util/constants';
import { generateCustomId } from '../../util/generate-id';

export class FileService {
    private static mimeTypes: { [key: string]: string } = {
        '/': 'jpeg',
        i: 'png',
        R: 'gif',
        U: 'webp',
        J: 'PDF',
        P: 'svg',
    };

    private static remove = (file: string): void => {
        if (existsSync(file)) unlinkSync(file);
    };

    static getImage = (file?: string | null): string => {
        const imageFilePath = path.join(imagesFolder, file || 'Genies.HM');
        if (!existsSync(imageFilePath)) throw new Error('Image not found');
        return imageFilePath;
    };

    static saveImage = async (
        newImage?: string,
        oldImage?: string | null
    ): Promise<string | null> => {
        if (oldImage) FileService.remove(path.join(imagesFolder, oldImage));
        if (!newImage) return null;

        const extensionFile = FileService.mimeTypes[newImage.charAt(0)];
        const imageFileName = `${generateCustomId()}.${extensionFile}`;
        const imageFilePath = path.join(imagesFolder, imageFileName);

        await promises.writeFile(imageFilePath, newImage, {
            encoding: 'base64',
        });

        return imageFileName;
    };
}
