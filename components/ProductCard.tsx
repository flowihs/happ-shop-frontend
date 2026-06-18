"use client";

import styles from "./product-card.module.scss";

interface ProductCard {
  rating: number;
  image: string;
  text: string;
  price: string;
  reviews: number;
  oldPrice: string | null;
  promoLabels: string | null;
  discount: string | null;
  comments: number | null;
  quality: string | "Хорошее";
  checkFavorites: boolean | false;
}

export default function ProductCard(props: ProductCard) {
  return (
    <div className={styles.productCard}>
      <div className={styles.image}>
        <img src={props.image} alt="" />
        {props.promoLabels ? (
          <p className={styles.promoLabel}>{props.promoLabels}</p>
        ) : props.discount ? (
          <p className={styles.discount}>{props.discount}</p>
        ) : null}
      </div>

      <div className={styles.price}>
        <p>
          <span className={styles.newPrice}>{props.price}</span>
          {props.oldPrice ? (
            <span className={styles.oldPrice}>{props.oldPrice}</span>
          ) : null}

        </p>
      </div>

      <div className={styles.text}>
        {props.text.length > 25 ? (
          <h2>
            <span>{props.text.substring(0, 25)}</span>
            {props.text.length > 60 ? props.text.substring(25, 60)+"..." :
            props.text.substring(25)}
          </h2>
        ) : (
          <h2>
            <span>{props.text.substring(0,25)}</span>
          </h2>
        )}

        <div className={styles.details}>
          <div className={styles.rating}>
            <svg
              width="200"
              height="200"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stop-color="#FFE58A" />
                  <stop offset="40%" stop-color="#FFC400" />
                  <stop offset="100%" stop-color="#D89B00" />
                </linearGradient>

                <filter
                  id="shadow"
                  x="-20%"
                  y="-20%"
                  width="140%"
                  height="140%"
                >
                  <feDropShadow
                    dx="0"
                    dy="1"
                    stdDeviation="1"
                    flood-color="#000000"
                    flood-opacity="0.25"
                  />
                </filter>
              </defs>

              <path
                d="M12 2.5l2.9 6.2 6.8.6-5.1 4.4 1.5 6.6L12 16.9 6 20.3l1.5-6.6-5.1-4.4 6.8-.6L12 2.5z"
                fill="url(#gold)"
                filter="url(#shadow)"
              />
            </svg>
            <span>{props.rating}</span>
          </div>
          <div className={styles.comments}>
            <span>{props.comments}</span>
          </div>
          <div className={styles.quality}>
            <span>{props.quality}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
