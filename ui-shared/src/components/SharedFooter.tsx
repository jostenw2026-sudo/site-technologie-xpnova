import React from 'react';

export interface FooterColumn {
  title: string;
  links: Array<{
    label: string;
    href: string;
    external?: boolean;
  }>;
}

export interface SharedFooterProps {
  columns: FooterColumn[];
  companyInfo?: {
    logo?: string;
    signature?: string;
    address?: string;
    phone?: string;
    email?: string;
    responsePromise?: string;
  };
  divisions?: Array<{
    name: string;
    url: string;
    description: string;
  }>;
  legal?: {
    mention?: string;
    mentionsLegales?: string;
    confidentialite?: string;
  };
  className?: string;
}

/**
 * Pied de page partagé - 4 colonnes
 * Conforme CDC Portail V1.9 §4.2
 */
export const SharedFooter: React.FC<SharedFooterProps> = ({
  columns,
  companyInfo = {
    signature: 'De l\'idée à l\'impact.',
    address: '134, Rue 1813, Vallée Bastos — B.P. 5603, Nlongkak, Yaoundé, Cameroun',
    phone: '+237 670 034 000',
    email: 'contact@xp-nova.com',
    responsePromise: '48 h',
  },
  divisions = [],
  legal = {
    mention: '© XP-NOVA SARL — Bureau d\'Ingénierie Conseil',
    mentionsLegales: '/mentions-legales',
    confidentialite: '/confidentialite',
  },
  className = '',
}) => {
  return (
    <footer className={`xpnova-shared-footer ${className}`} style={{
      backgroundColor: '#0D1F5C',
      color: '#FFFFFF',
      padding: '48px 24px 24px',
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(1, 1fr)',
        gap: '32px',
        [`@media (min-width: 640px)`]: {
          gridTemplateColumns: 'repeat(2, 1fr)',
        },
        [`@media (min-width: 1024px)`]: {
          gridTemplateColumns: '1.18fr 0.86fr 0.86fr 1.1fr',
        },
      } as any}>
        {/* Colonne 1 : Identité et contact */}
        <div>
          {companyInfo.logo && (
            <img
              src={companyInfo.logo}
              alt="XP-NOVA"
              style={{ height: '32px', width: 'auto', marginBottom: '16px' }}
            />
          )}
          {companyInfo.signature && (
            <p style={{
              fontSize: '0.875rem',
              fontStyle: 'italic',
              marginBottom: '16px',
              opacity: 0.9,
            }}>
              {companyInfo.signature}
            </p>
          )}
          <div style={{
            borderTop: '1px solid #D4A017',
            marginBottom: '16px',
            width: '40px',
          }} />
          <div style={{ fontSize: '0.875rem', lineHeight: 1.6, opacity: 0.9 }}>
            {companyInfo.address && <p style={{ margin: '0 0 8px 0' }}>{companyInfo.address}</p>}
            {companyInfo.phone && <p style={{ margin: '0 0 8px 0' }}>{companyInfo.phone}</p>}
            {companyInfo.email && <p style={{ margin: '0 0 8px 0' }}>{companyInfo.email}</p>}
            {companyInfo.responsePromise && (
              <p style={{ margin: 0, fontWeight: 500 }}>
                Premier retour sous {companyInfo.responsePromise}
              </p>
            )}
          </div>
        </div>

        {/* Colonnes 2-4 : Liens */}
        {columns.map((column, index) => (
          <div key={index}>
            <h3 style={{
              fontSize: '0.875rem',
              fontWeight: 600,
              color: '#D4A017',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              marginBottom: '16px',
              marginTop: 0,
            }}>
              {column.title}
            </h3>
            <ul style={{
              listStyle: 'none',
              margin: 0,
              padding: 0,
            }}>
              {column.links.map((link) => (
                <li key={link.href} style={{ marginBottom: '10px' }}>
                  <a
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    style={{
                      color: '#FFFFFF',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      opacity: 0.9,
                      transition: 'opacity 0.2s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '0.9'}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Colonne divisions (si fournie séparément) */}
        {divisions.length > 0 && (
          <div>
            <h3 style={{
              fontSize: '0.875rem',
              fontWeight: 600,
              color: '#D4A017',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              marginBottom: '16px',
              marginTop: 0,
            }}>
              Nos divisions
            </h3>
            {divisions.map((division) => (
              <div key={division.url} style={{ marginBottom: '16px' }}>
                <a
                  href={division.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#FFFFFF',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    display: 'block',
                    marginBottom: '4px',
                  }}
                >
                  {division.name}
                </a>
                <p style={{
                  fontSize: '0.8rem',
                  opacity: 0.8,
                  margin: 0,
                  lineHeight: 1.4,
                }}>
                  {division.description}
                </p>
                <a
                  href={division.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#D4A017',
                    textDecoration: 'none',
                    fontSize: '0.75rem',
                    marginTop: '4px',
                    display: 'inline-block',
                  }}
                >
                  {division.url.replace('https://', '')}
                </a>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Barre basse */}
      <div style={{
        maxWidth: '1280px',
        margin: '32px auto 0',
        paddingTop: '24px',
        borderTop: '1px solid ' + 'rgba(255,255,255,0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px',
        fontSize: '0.8rem',
        opacity: 0.8,
      }}>
        {legal?.mention && <span>{legal.mention}</span>}
        <div style={{ display: 'flex', gap: '24px' }}>
          {legal?.mentionsLegales && (
            <a
              href={legal.mentionsLegales}
              style={{ color: '#FFFFFF', textDecoration: 'none' }}
            >
              Mentions légales
            </a>
          )}
          {legal?.confidentialite && (
            <a
              href={legal.confidentialite}
              style={{ color: '#FFFFFF', textDecoration: 'none' }}
            >
              Confidentialité
            </a>
          )}
        </div>
      </div>
    </footer>
  );
};

export default SharedFooter;
