# inherit from a existing image to add the functionality
FROM malithajeewaka/nextprojects:latest

# RUN addgroup app && adduser -S -G app app
# USER app

# Set the working directory and assign ownership to the non-root user
WORKDIR /app

# Copy the package.json and package-lock.json files into the image.
COPY package*.json ./

# Install the dependencies.
RUN npm install

# Copy the rest of the source files into the image.
COPY . .

# Expose the port that the application listens on.
EXPOSE 80

# Run the application.
CMD npm run dev
