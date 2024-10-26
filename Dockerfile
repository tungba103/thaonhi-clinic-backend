FROM node:20.16.0

# Install dependencies during build
RUN yarn install

# RUN  npx prisma generate

# EXPOSE 9000

# Set up the runtime entrypoint command to keep the container alive
# ENTRYPOINT ["npm", "run", "start:dev"]