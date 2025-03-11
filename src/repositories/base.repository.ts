import type { PrismaClient } from "@prisma/client";

const DEFAULT_ORDER_BY = {
    createdAt: "DESC",
};
const RECORD_TAKE = 20;

export default abstract class BaseRepository<T> {
    protected model: any;

    constructor(protected client: PrismaClient, modelName: keyof PrismaClient) {
        this.model = client[modelName];
    }

    findMany(options: Record<string, any> = {}): Promise<Array<T>> {
        if (!options.orderBy) options.orderBy = DEFAULT_ORDER_BY;
        if (!options.take || options.take > RECORD_TAKE)
            options.take = RECORD_TAKE;

        return this.model.findMany(options);
    }
}
