import { readFileSync } from "fs";
import { join, dirname } from "path";
import * as yaml from "js-yaml";

import { NODE_ENV } from "@/constants";

const APPLICATION_CONFIG_FILENAME = "application.yaml";

export default () => {
    const applicationConfig = yaml.load(
        readFileSync(join(__dirname, APPLICATION_CONFIG_FILENAME), "utf-8"),
    ) as Record<string, any>;

    return applicationConfig[NODE_ENV];
};
