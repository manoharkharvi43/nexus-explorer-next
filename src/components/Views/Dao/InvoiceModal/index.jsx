import nexus_blue64 from 'assets/icons/nexus_blue64.png';
import Image from 'next/image';
import React from 'react';
import { IoClose } from 'react-icons/io5';
import TYPES from 'types';
import { cls, timestampToDate } from 'utils';
import { InvoiceStatus } from '../InvoiceStatus/invoiceStatus';
import styles from './invoiceModal.module.scss';

export function InvoiceModal(props) {
  const { onClose, data } = props;
  const { address, created, modified, owner, json } = data;
  const {
    account = 0,
    amount = 0,
    sender_detail = '',
    reference = '',
    description = '',
    status = '',
    recipient = '',
    recipient_detail = '',
    items = [],
  } = json;

  return (
    <section className={styles.backdrop} onClick={onClose}>
      <article className={styles.modal}>
        <div className={styles.close} onClick={onClose}>
          <IoClose color={TYPES.COLORS.MARKET_RED} />
        </div>
        <div className={styles.content}>
          <header>
            <div className={styles.stamp}>
              <Image
                src={nexus_blue64}
                width={48}
                height={48}
                layout={'fixed'}
                alt={'nexus logo'}
              />
              <div>
                <h1> Invoice Details</h1>
                <label className={styles.createdDate}>
                  Created on {timestampToDate(created)}
                </label>
              </div>
            </div>
            <div className={styles.dueStatus}>
              <label>
                <i>Modified on:</i> {timestampToDate(modified)}
              </label>
              <label className={styles.status}>
                <i>Status:</i> <InvoiceStatus status={status} />
              </label>
            </div>
          </header>
          <main className={styles.details}>
            <div className={styles.details__transaction}>
              <div>
                <i>From:</i>
                <div>
                  <p>{owner}</p>
                  <label>{sender_detail}</label>
                </div>
              </div>
              <div>
                <i>Recipient:</i>
                <div>
                  <p>{recipient}</p>
                  <label>{recipient_detail}</label>
                </div>
              </div>
              <div>
                <i>Account:</i>
                <p>{account}</p>
              </div>
              {address && (
                <div>
                  <i>Address: </i>
                  <p>{address}</p>
                </div>
              )}
            </div>
            <div className={styles.details__summary}>
              <h3>Summary</h3>
              {reference && (
                <p>
                  <i>Reference: </i>
                  {reference}
                </p>
              )}
              {description && (
                <p>
                  <i>Description: </i>
                  {description}
                </p>
              )}
            </div>
            <div className={styles.details__items}>
              <div className={cls(styles.item, styles.header)}>
                <i>Description</i>
                <i>Unit</i>
                <i>Unit Amount(NXS)</i>
              </div>
              {items.map((item, idx) => (
                <div key={idx} className={styles.item}>
                  <label>{item?.description}</label>
                  <label>{item.unit}</label>
                  <label>{item?.unit_amount}</label>
                </div>
              ))}
              <div className={cls(styles.item, styles.total)}>
                <h3>Total Amount(NXS):</h3>
                <h2>{amount}</h2>
              </div>
            </div>
          </main>
        </div>
      </article>
    </section>
  );
}
