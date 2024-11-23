# Gunakan Node.js sebagai image dasar
FROM node:18

# Set working directory
WORKDIR /app

# Salin file package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin semua file proyek
COPY . .

# Build aplikasi
RUN npm run build

# Expose port aplikasi
EXPOSE 3001

# Perintah untuk menjalankan aplikasi
CMD ["npm", "run", "start:prod"]
