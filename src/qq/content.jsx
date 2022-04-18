import { Image } from 'antd';

import styled from "@emotion/styled";

export default function content (props) {
  const { data } = props
  return (
    <Wrapper>
      <Image
        width={60}
        src={data.qlogo}
      />
      <Desc>
        <div>{data.name}</div>
        <div>{data.qq}</div>
      </Desc>
    </Wrapper>
  )
};

const Wrapper = styled.div`
  display: flex;
  width: 200px;
  margin: 10px;
  padding: 5px;
  border: 1px solid #999;
  border-radius: 5px;
`;

const Desc = styled.div`
  margin-left: 10px;
  padding-top: 8px;
`;
