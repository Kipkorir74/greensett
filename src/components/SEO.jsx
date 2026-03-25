import { Helmet } from 'react-helmet-async'

export default function SEO({
  title,
  description,
  keywords,
  url,
  image = 'https://greensett.com/logo.jpeg',
}) {
  const fullTitle = title
    ? `${title} | Greensett Logistics`
    : 'Greensett Logistics — Home of Logistics Solutions'

  return (
    <Helmet>
      {/* Primary */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords"    content={keywords} />
      <link rel="canonical"    href={url} />

      {/* Open Graph (Facebook, LinkedIn, WhatsApp previews) */}
      <meta property="og:type"        content="website" />
      <meta property="og:title"       content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image"       content={image} />
      <meta property="og:url"         content={url} />
      <meta property="og:site_name"   content="Greensett Logistics" />
      <meta property="og:locale"      content="en_KE" />

      {/* Twitter Card */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={image} />

      {/* Geo targeting — East Africa */}
      <meta name="geo.region"      content="KE" />
      <meta name="geo.placename"   content="Nairobi, Kenya" />
      <meta name="geo.position"    content="-1.29;36.82" />
      <meta name="ICBM"            content="-1.29, 36.82" />

      {/* Business info */}
      <meta name="author"   content="Greensett Logistics Limited" />
      <meta name="robots"   content="index, follow" />
      <meta name="language" content="English" />
    </Helmet>
  )
}