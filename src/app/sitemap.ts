/* eslint-disable @typescript-eslint/no-explicit-any */
import { MetadataRoute } from 'next';

/**
 * Replace with your actual production domain
 */
const BASE_URL = 'https://sparedoc.com';
const BACEND_URL = 'https://backend.sparedoc.com/api/v1';

/**
 * List of locales supported in your [locale] folder
 */
const locales = ['en', 'fr', 'ar'];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Define Static Routes (Paths without dynamic IDs)
  const staticPaths = [
    '',
    '/about',
    '/contact',
    '/faq',
    '/privacy-policy',
    '/terms-and-conditions',
    '/product',
  ];

  // 2. Initialize the entries array
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // 3. Add Localized Static Pages
  locales.forEach((locale) => {
    staticPaths.forEach((path) => {
      sitemapEntries.push({
        url: `${BASE_URL}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: path === '' ? 1.0 : 0.8,
      });
    });
  });

  // 4. Fetch Dynamic Data (Products & Categories)
  try {
    const [prodRes, catRes] = await Promise.all([
      fetch(`${BACEND_URL}/products?limit=100`, { next: { revalidate: 3600 } }),
      fetch(`${BACEND_URL}/categories`, { next: { revalidate: 3600 } })
    ]);

    const prodData = await prodRes.json();
    const catData = await catRes.json();

    const products = prodData?.data || [];
    const categories = catData?.data || [];

    // Add Localized Dynamic Product Pages
    locales.forEach((locale) => {
      products.forEach((product: any) => {
        sitemapEntries.push({
          url: `${BASE_URL}/${locale}/product/${product.id}`,
          lastModified: new Date(product.updatedAt || new Date()),
          changeFrequency: 'daily',
          priority: 0.7,
        });
      });

      // Add Localized Dynamic Category Pages
      categories.forEach((category: any) => {
        sitemapEntries.push({
          url: `${BASE_URL}/${locale}/category/${category.id}`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.6,
        });
      });
    });
  } catch (error) {
    console.error("Sitemap generation error:", error);
  }

  return sitemapEntries;
}