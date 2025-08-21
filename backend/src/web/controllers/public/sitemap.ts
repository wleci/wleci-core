import { Request, Response } from 'express';

const controllerPublicSitemap = (req: Request, res: Response) => {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

    // Statyczne strony do sitemap
    const staticPages = [
        {
            url: '/',
            lastmod: currentDate,
            changefreq: 'daily',
            priority: '1.0'
        },
        {
            url: '/auth/sign-in',
            lastmod: currentDate,
            changefreq: 'monthly',
            priority: '0.8'
        },
        {
            url: '/auth/sign-up',
            lastmod: currentDate,
            changefreq: 'monthly',
            priority: '0.8'
        }
        // Dodaj więcej statycznych stron tutaj
    ];

    // Generuj XML sitemap
    let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    // Dodaj statyczne strony
    staticPages.forEach(page => {
        sitemapXml += `
    <url>
        <loc>${baseUrl}${page.url}</loc>
        <lastmod>${page.lastmod}</lastmod>
        <changefreq>${page.changefreq}</changefreq>
        <priority>${page.priority}</priority>
    </url>`;
    });

    // TODO: Dodaj dynamiczne strony z bazy danych
    // Przykład: posty z bloga, produkty, profile użytkowników
    /*
    const dynamicPages = await getDynamicPagesFromDatabase();
    dynamicPages.forEach(page => {
        sitemapXml += `
    <url>
        <loc>${baseUrl}${page.url}</loc>
        <lastmod>${page.lastmod}</lastmod>
        <changefreq>${page.changefreq}</changefreq>
        <priority>${page.priority}</priority>
    </url>`;
    });
    */

    sitemapXml += `
</urlset>`;

    // Ustaw proper content type i wyślij
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.send(sitemapXml);
};

export default controllerPublicSitemap;
