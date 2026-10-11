'use client';

import React from 'react';

export interface DivisionBadgeProps {
  divisionName: string;
  parentUrl?: string;
  className?: string;
  showParentLink?: boolean;
}

/**
 * Badge "Une division de XP-NOVA"
 * À afficher sur les sites de division (AGROVITA, ODT, Technologie, Ingénierie de la formation)
 */
export const DivisionBadge: React.FC<DivisionBadgeProps> = ({
  divisionName,
  parentUrl = 'https://xp-nova.com',
  className = '',
  showParentLink = true,
}) => {
  return (
    <div className={`xpnova-division-badge ${className}`} style={{
      backgroundColor: '#F4F5F8',
      borderLeft: '4px solid #D4A017',
      padding: '12px 20px',
      margin: '16px 0',
    }}>
      {showParentLink ? (
        <a
          href={parentUrl}
          style={{
            color: '#0D1F5C',
            textDecoration: 'none',
            fontSize: '0.875rem',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span style={{ opacity: 0.7 }}>←</span>
          <span>Une division de XP-NOVA</span>
        </a>
      ) : (
        <span style={{
          color: '#0D1F5C',
          fontSize: '0.875rem',
          fontWeight: 500,
        }}>
          Une division de XP-NOVA
        </span>
      )}
    </div>
  );
};

export default DivisionBadge;
