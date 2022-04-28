import PropTypes from 'prop-types';
import classes from '../Basic/Basic.module.scss';
import styles from './Market.module.scss';
import { Card_Watermark, Card_Header, Card_Footer } from '..';
import { AiOutlineFall, AiOutlineRise } from 'react-icons/ai';
import TYPES from 'types';

const MarketIconValue = ({ label, value }) => {
  return (
    <span className={[styles.market__price].join(' ')}>
      {value.match(/[-]/g) != '-' ? (
        <AiOutlineRise
          className={styles.market__price__icon}
          title={label}
          color={TYPES.COLORS.MARKET_GREEN}
        />
      ) : (
        <AiOutlineFall
          className={styles.market__price__icon}
          title={label}
          color={TYPES.COLORS.MARKET_RED}
        />
      )}
      <p
        data-state={`${value.match(/[-]/g) != '-'}`}
        className={[styles.market__price__value].join(' ')}
        title={value}>
        {value}
      </p>
    </span>
  );
};

const Card_Body = ({
  text,
  reserveLabel,
  reserve,
  rewardLabel,
  reward,
  unit,
}) => (
  <div className={[classes.body].join(' ')}>
    {/* Card main value */}
    <div className={classes.body__text}>
      <p className={classes.body__text__value} title={text}>
        {text}
      </p>
      <sub className={classes.body__text__unit} title={unit}>
        {unit}
      </sub>
      {reserve && <MarketIconValue label={reserveLabel} value={reserve} />}{' '}
    </div>
    <div className={classes.txn__block}>
      <span className={classes.txn__block__type}>
        <label className={classes.txn__block__type__label} title={rewardLabel}>
          {rewardLabel}
        </label>
        <p className={classes.txn__block__type__value} title={reward}>
          {reward}
        </p>
      </span>
    </div>
  </div>
);

export const Market = ({
  label = '',
  sublabel = '',
  delayTime = '',
  text = '',
  unit = '',
  reserve = '',
  reserveLabel = '',
  reward = '',
  rewardLabel = '',
  footerLabel = '',
  footerValue = '',
  ...props
}) => {
  return (
    <section className={classes.detailcard}>
      <Card_Watermark {...props} />
      <Card_Header
        label={label}
        sublabel={sublabel}
        ticker={delayTime}
        {...props}
      />
      <Card_Body
        text={text}
        reserve={reserve}
        reserveLabel={reserveLabel}
        reward={reward}
        rewardLabel={rewardLabel}
        unit={unit}
        {...props}
      />
      <Card_Footer
        footerLabel={footerLabel}
        footerValue={footerValue}
        {...props}
      />
    </section>
  );
};

export default Market;

Market.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  sublabel: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  unit: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  delayTime: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  reserve: PropTypes.string,
  reserveLabel: PropTypes.string,
  reward: PropTypes.string,
  rewardLabel: PropTypes.string,
  footerLabel: PropTypes.string,
  footerValue: PropTypes.string,
};
