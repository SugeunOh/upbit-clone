import React from "react";
import { useSelector } from "react-redux";

const withLatestCoinData = () => (OriginalComponent) => (props) => {
  const state = useSelector((state) => state);
  const coinListDatas = state.Coin.candle.data; // 코인들 데이터

  const latestCoinData = {};

  if (Object.keys(coinListDatas).length > 2) {
    Object.keys(coinListDatas).forEach((marketName) => {
      latestCoinData[marketName] = {};
      latestCoinData[marketName].price =
        coinListDatas[marketName].candles[
          coinListDatas[marketName].candles.length - 1
        ].close;

      latestCoinData[marketName].changeRate24Hour = (
        Math.round(coinListDatas[marketName].changeRate24Hour * 10000) / 100
      ).toFixed(2);

      latestCoinData[marketName].changePrice24Hour =
        coinListDatas[marketName].changePrice24Hour;

      latestCoinData[marketName].tradePrice24Hour = Math.floor(
        coinListDatas[marketName].tradePrice24Hour / 1000000
      );
    });
  }

  // console.log("여길봐", latestCoinData);

  // return Object.keys(coinListDatas).length > 1 ? (
  //   <OriginalComponent {...props} coinListDatas={coinListDatas} />
  // ) : (
  //   <div>loading</div>
  // );
  return <OriginalComponent {...props} latestCoinData={latestCoinData} />;
};

export default withLatestCoinData;
