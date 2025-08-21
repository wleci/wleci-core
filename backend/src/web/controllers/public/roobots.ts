import { Request, Response } from 'express';

const controllerPublicRobots = (req: Request, res: Response) => {
    const environment = globalThis.CONFIG?.application?.mode || 'development';

    // Robots.txt content w zależności od środowiska
    let robotsContent = '';

    if (environment === 'production') {
        // Production - pozwól na indeksowanie
        robotsContent = `User-agent: *
Allow: /

# Sitemap
Sitemap: ${req.protocol}://${req.get('host')}/sitemap.xml

# Disallow admin and auth pages
Disallow: /admin/
Disallow: /dashboard/
Disallow: /auth/
Disallow: /api/

# Crawl delay
Crawl-delay: 1`;
    } else {
        // Development/Test - blokuj indeksowanie
        robotsContent = `User-agent: *
Disallow: /

# Development environment - no indexing allowed`;
    }

    // Ustaw proper content type i wyślij
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.send(robotsContent);
};

export default controllerPublicRobots;
