import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: './index.html', 
        read: './read.html',
        bookDetails: './book-details.html',
        wantToRead: './wantToRead.html',
      }
    }
  }
});
