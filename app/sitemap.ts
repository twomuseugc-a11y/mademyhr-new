import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
const baseUrl = "https://www.madebyhr.in";

return [
{
url: baseUrl,
lastModified: new Date(),
},
{
url: `${baseUrl}/about`,
lastModified: new Date(),
},
{
url: `${baseUrl}/product`,
lastModified: new Date(),
},
];
}
