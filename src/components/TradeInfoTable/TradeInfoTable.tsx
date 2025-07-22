import { FC } from 'react';
import { TON_VIEWER_BASE_URL, BUYER_ADDRESS } from '@/constants/links';
import './TradeInfoTable.css';

export const TradeInfoTable: FC = () => {
  return (
    <>
      <h4>Trade Info</h4>
      <div className="tm-section-box tm-section-bid-info">
        <table className="table tm-table tm-table-fixed trade-info-table">
          <thead>
            <tr>
              <th>Deal Status</th>
              <th>Username Status</th>
              <th>Buyer</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="table-cell-value">Deal in Progress</div>
              </td>
              <td>
                <div className="table-cell-desc">Swappable</div>
              </td>
              <td>
                <a
                  href={`${TON_VIEWER_BASE_URL}${BUYER_ADDRESS}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="table-cell-desc"
                >
                  Ef_BbsF16B4aReCFhXI...
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
