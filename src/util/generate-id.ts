import { createId } from '@paralleldrive/cuid2';

const generateCustomId = () => {
    return createId().toUpperCase();
};

export { generateCustomId };
