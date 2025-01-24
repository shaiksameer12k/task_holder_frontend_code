import React from "react";
import { Card, Col, Row } from "antd";

import DynamicIcon from "../IconComponent/IconComponent";
const CustomCard = ({
  cardIcon,
  cardName,
  cardColor,
  totalCount,
  complitedCount,
  onClickHandel,
  selectedData,
}) => {
  return (
    <Card
      style={{
        // width: 200,
        background: cardColor,
        color: "#ffffff",
        cursor: "pointer",
      }}
      onClick={() => onClickHandel(cardName)}
      className="shadow-lg"
    >
      <Row gutter={16} className="relative w-full">
        <div className="absolute flex justify-center items-center opacity-20 rotate-45">
          <DynamicIcon iconName={cardIcon} color="#ffffff" size={"30%"} />
        </div>
       {cardIcon && <Col xs={8} sx={8} lg={8} className="gutter-row">
          <DynamicIcon
            iconName={cardIcon}
            color="#ffffff"
            size={"100%"}
            className="rotate-45"
          />
        </Col>}
        <Col xs={16} sx={16} lg={16} className="gutter-row">
          <div>
            <h3
              className={
                cardName == selectedData
                  ? "text-xl font-bold text-white"
                  : "text-xl font-bold text-black"
              }
            >
              {cardName}
            </h3>
            {totalCount && (
              <span className="text-sm font-semibold">
                Qns : {complitedCount}/{totalCount}
              </span>
            )}
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default CustomCard;
