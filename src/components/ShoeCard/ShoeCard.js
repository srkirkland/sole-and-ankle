import React from "react";
import styled from "styled-components/macro";

import { COLORS, WEIGHTS } from "../../constants";
import { formatPrice, pluralize, isNewShoe } from "../../utils";
import Spacer from "../Spacer";

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
          {variant === "on-sale" ? (
            <VariantTag>
              <SaleTag>Sale</SaleTag>
            </VariantTag>
          ) : variant === "new-release" ? (
            <VariantTag>
              <NewTag>Just Released</NewTag>
            </VariantTag>
          ) : null}
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Col>
            <Name>{name}</Name>
            <ColorInfo>{pluralize("Color", numOfColors)}</ColorInfo>
          </Col>
          <Col>
            {typeof salePrice === "number" ? (
              <StrikedPrice>{formatPrice(price)}</StrikedPrice>
            ) : (
              <Price>{formatPrice(price)}</Price>
            )}
            <SalePrice>{formatPrice(salePrice)}</SalePrice>
          </Col>
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  flex: 4 2 340px;
`;

const VariantTag = styled.span`
  position: absolute;
  width: max-content;
  margin-top: 12px;
  color: white;
`;

const SaleTag = styled.span`
  margin-left: -40px;
  background-color: #c5295d;
  border-radius: 2px;
  padding: 8px;
`;

const NewTag = styled.span`
  margin-left: -112px;
  background: #6868d9;
  border-radius: 2px;
  padding: 8px;
`;

const Wrapper = styled.article`
  flex: 1 1 350px;
  max-width: 550px;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Col = styled.div`
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span``;

const StrikedPrice = styled.span`
  text-decoration: line-through;
  opacity: 0.5;
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
