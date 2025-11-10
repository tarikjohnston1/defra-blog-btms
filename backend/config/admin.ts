/**
 * Function to generate preview pathname based on content type and document
 */
const getPreviewPathname = (uid: string, { document }): string | null => {
  const { slug } = document;

  switch (uid) {
    // Handle blog posts
    case "api::post.post": {
      if (!slug) {
        return "/"; // Homepage/blog listing
      }
      return `/posts/${slug}`; // Individual post page
    }
    default: {
      return null; // No preview available for this content type
    }
  }
};

export default ({ env }) => {
  const clientUrl = env("CLIENT_URL", "http://localhost:3000");
  const previewSecret = env("PREVIEW_SECRET");

  return {
    auth: {
      secret: env('ADMIN_JWT_SECRET'),
    },
    apiToken: {
      salt: env('API_TOKEN_SALT'),
    },
    transfer: {
      token: {
        salt: env('TRANSFER_TOKEN_SALT'),
      },
    },
    secrets: {
      encryptionKey: env('ENCRYPTION_KEY'),
    },
    flags: {
      nps: env.bool('FLAG_NPS', true),
      promoteEE: env.bool('FLAG_PROMOTE_EE', true),
    },
    preview: {
      enabled: true,
      config: {
        allowedOrigins: clientUrl,
        async handler(uid, { documentId, locale, status }) {
          const document = await strapi.documents(uid).findOne({ documentId });
          
          if (!document) {
            return null;
          }

          const pathname = getPreviewPathname(uid, { document });
          
          if (!pathname) {
            return null; // No preview available for this content type
          }

          // Build preview URL with authentication and status
          const params = new URLSearchParams({
            secret: previewSecret || 'preview-secret-key',
            slug: document.slug || '',
          });

          // Add status parameter for draft/published distinction
          if (status === 'draft') {
            params.set('status', 'draft');
          }

          return `${clientUrl}/api/preview?${params.toString()}`;
        },
      },
    },
  };
};
