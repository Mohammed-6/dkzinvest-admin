type sitemapProps = {
    name: string;
    urlPath: string;
    access: boolean;
}

type schemaProps = {
    name: string,
    sitemap: [sitemapProps]
}

export type securityGroupProps = {
    _id: string;
    name: string;
    code: string;
    schema: [schemaProps];
    status: boolean;
}

export const listSecurityGroupsProps:securityGroupProps[] = [];