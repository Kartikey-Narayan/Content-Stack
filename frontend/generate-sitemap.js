// Import necessary modules from 'sitemap' and 'fs' packages.
// SitemapStream is used to create a stream for building the sitemap.
// streamToPromise converts the sitemap stream to a promise to handle it asynchronously.
// createWriteStream is used to write the generated sitemap to a file.
import { SitemapStream } from 'sitemap';
import { createWriteStream } from 'fs';

// Create a writable stream to save the sitemap to a file.
const writeStream = createWriteStream('./public/sitemap.xml');

// Handle stream errors manually
writeStream.on('error', (err) => {
  console.error('Error writing to sitemap.xml:', err);
});

// Create the SitemapStream with the hostname of your website.
const sitemap = new SitemapStream({ hostname: 'https://content-stack.kartikeynarayan.in' });

// Define the pages to include in the sitemap.
const pages = [
  { url: '/', changefreq: 'daily', priority: 1.0 }
];

// Pipe the sitemap stream to the writable file stream.
sitemap.pipe(writeStream);

// Write each page to the sitemap.
pages.forEach(page => sitemap.write(page));

// End the sitemap stream.
sitemap.end();

// Log a success message when the write stream finishes.
writeStream.on('finish', () => {
  console.log('Sitemap generated successfully.');
});
