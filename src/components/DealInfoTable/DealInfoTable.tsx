import { FC } from 'react';
import { formatUSD } from '@/utils/currency';

interface DealInfoTableProps {
  dealPrice: string;
  commission: string;
}

export const DealInfoTable: FC<DealInfoTableProps> = ({ dealPrice, commission }) => {
  const values = [dealPrice, commission];
  const headers = ['Deal Price', 'Commission'];

  return (
    <div className="tm-section-box tm-section-bid-info">
      <table className="table tm-table tm-table-fixed">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {values.map((value, index) => (
              <td key={index}>
                <div 
                  className="table-cell table-cell-oneline table-cell-wide" 
                  style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center' 
                  }}
                >
                  <div className="table-cell-value tm-value icon-before icon-ton">
                    {value}
                  </div>
                  <div className="table-cell-desc">
                    ~ {formatUSD(value)}
                  </div>
                </div>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};
