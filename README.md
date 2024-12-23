# Backend for Portfolio Website

[![GitHub license](https://img.shields.io/github/license/FlxBot001/My-Portfolio-BE)](https://github.com/FlxBot001/My-Portfolio-BE/blob/main/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/FlxBot001/My-Portfolio-BE)](https://github.com/FlxBot001/My-Portfolio-BE/issues)
[![GitHub stars](https://img.shields.io/github/stars/FlxBot001/My-Portfolio-BE)](https://github.com/FlxBot001/My-Portfolio-BE/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/FlxBot001/My-Portfolio-BE)](https://github.com/FlxBot001/My-Portfolio-BE/network)

This is the backend for the portfolio website, built with Next.js and designed to support various features such as a gallery, blogs, projects, shops, contact functionality, and customizable settings.

## Features

### 1. **Gallery**
   - Upload and manage images.
   - Categorize images into albums or tags.
   - Support for responsive image formats.

### 2. **Blogs**
   - Create, edit, and delete blog posts.
   - Support for rich-text content.
   - Organize blogs by categories and tags.
   - SEO-friendly URLs for blog posts.

### 3. **Projects**
   - Showcase your projects.
   - Include details like project title, description, links, and images.
   - Support for filtering projects by category.

### 4. **Shops**
   - Manage product listings for an integrated shop.
   - Features include product images, descriptions, prices, and categories.
   - Integration with payment gateways for transactions.

### 5. **Contact**
   - Contact form for user inquiries.
   - Backend support for sending emails.
   - Store messages in the database for future reference.

### 6. **Settings**
   - Admin panel for customizing site settings.
   - Update site title, theme, and other global configurations.

## Technologies Used

- **Next.js**: Framework for building the backend and server-side rendering.
- **Node.js**: Backend runtime environment.
- **Express** (if applicable): Middleware for handling API requests.
- **MongoDB**: Database for storing content like blogs, projects, and settings.
- **Cloudinary**: Image management and optimization (optional).
- **SendGrid/Mailgun**: For managing contact form emails.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/FlxBot001/My-Portfolio-BE.git
   cd portfolio-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and configure the following:
   ```env
   DATABASE_URL=<your-mongodb-connection-string>
   CLOUDINARY_URL=<your-cloudinary-url>
   SENDGRID_API_KEY=<your-sendgrid-api-key>
   NEXT_PUBLIC_BASE_URL=<your-site-url>
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Access the backend at `http://localhost:3000`.

## API Endpoints

### Gallery
- `GET /api/gallery`: Fetch all images.
- `POST /api/gallery`: Upload a new image.
- `DELETE /api/gallery/:id`: Delete an image.

### Blogs
- `GET /api/blogs`: Fetch all blog posts.
- `POST /api/blogs`: Create a new blog post.
- `PUT /api/blogs/:id`: Update a blog post.
- `DELETE /api/blogs/:id`: Delete a blog post.

### Projects
- `GET /api/projects`: Fetch all projects.
- `POST /api/projects`: Add a new project.
- `PUT /api/projects/:id`: Update a project.
- `DELETE /api/projects/:id`: Delete a project.

### Shops
- `GET /api/shops`: Fetch all products.
- `POST /api/shops`: Add a new product.
- `PUT /api/shops/:id`: Update a product.
- `DELETE /api/shops/:id`: Delete a product.

### Contact
- `POST /api/contact`: Send a message through the contact form.

### Settings
- `GET /api/settings`: Fetch site settings.
- `PUT /api/settings`: Update site settings.

## Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

3. Deploy to platforms like Vercel, AWS, or Heroku.

## Contact Information

- **Email**: [njugunafelix79@gmail.com](mailto:njugunafelix79@gmail.com)
- **Phone**: +254-0111255301
- **LinkedIn**: [linkedin.com/in/felixnjuguna](https://linkedin.com/in/felixnjuguna)

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push to your forked repository:
   ```bash
   git push origin feature-name
   ```
5. Create a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Acknowledgments

- Special thanks to the open-source community for inspiring this project.