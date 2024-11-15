# Define the builder stage to build the source code
FROM node:18 as builder

# Create app directory
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copying source files
COPY . .

# Building app
RUN npm run build


# Define the runner stage to get a lean production image
FROM node:18-slim

ENV PORT 3000

# Create app directory
WORKDIR /usr/src/app

# Copying node_modules and built files from builder stage
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/package*.json ./

# Expose the listening port
EXPOSE 3000

# Running the app
CMD ["npm", "run", "start"]