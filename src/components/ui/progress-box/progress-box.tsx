import { CheckMark } from '@components/icons/checkmark';
import cn from 'classnames';
import Scrollbar from '@components/ui/scrollbar';
import styles from './progress-box.module.css';
import { ORDER_STATUS, ORDER_STATUS_NAME } from '@ts-types/generated';
import { formatAddress } from '@utils/format-address';

type ProgressProps = {
  data: any[] | undefined;
  status: ORDER_STATUS;
};

const ProgressBox: React.FC<ProgressProps> = ({ status, data }) => {
  return (
    <Scrollbar
      className="w-full h-full"
      options={{
        scrollbars: {
          autoHide: 'never',
        },
      }}
    >
      <div className="flex flex-col py-7 md:items-start md:justify-start w-full md:flex-row">
        {data?.map((item: any) => (
          <div className={styles.progress_container} key={item.id}>
            <div
              className={cn(
                styles.progress_wrapper,
                status >= item.status ? styles.checked : ''
              )}
            >
              <div className={styles.status_wrapper}>
                {status >= item.status ? (
                  <div className="w-3 h-4">
                    <CheckMark className="w-full" />
                  </div>
                ) : (
                  item.status
                )}
              </div>
              <div className={styles.bar} />
            </div>

            <div className="flex flex-col items-start ms-5 md:items-center md:ms-0">
              {item && (
                <>
                  <span className="text-base text-body-dark capitalize font-semibold text-start md:text-center md:px-2">
                    {
                      //@ts-ignore
                      ORDER_STATUS_NAME[item?.status]
                    }
                    {}
                  </span>
                  {item?.address && (
                    <span>
                      {formatAddress(item?.address, item?.district, item?.city)}
                    </span>
                  )}
                  {item?.userName && <span>{item.userName}</span>}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </Scrollbar>
  );
};

export default ProgressBox;
