import { Input, Spin, message } from 'antd';
import { useState, useEffect } from 'react';
import Content from './content';
import { http, useDebounce } from '../utils';
import styled from "@emotion/styled";

export default function Qq () {
  const [no, setNo] = useState();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState({
    name: '',
    qlogo: '',
    qq: ''
  });

  useEffect(() => {
      if (isNaN(Number(no))) return;
      setLoading(true);
      http(`https://api.uomg.com/api/qq.info`, { qq: no }).then((data) => {
        if (data.code === 1) {
          setResult({
            name: data.name,
            qlogo: data.qlogo,
            qq: data.qq,
          });
        } else {
          setResult({});
        }
        setLoading(false);
      }).catch((e) => {
        setResult({});
        setLoading(false);
        message.error(e?.msg);
      })
      // 防抖，避免无效调用接口 暂给500毫秒
  }, [useDebounce(no, 500)]);

  return (
    <QWrapper>
      QQ: <Input style={{width: '200px'}}
        value={no} onChange={(e) => setNo(e.target.value)}  
        placeholder="请输入QQ号" /> <br />
      { loading ? <Spin /> : result.name  ? <Content data={result} /> : <Empty>暂无数据</Empty> } 
    </QWrapper>
  );
};

const QWrapper = styled.div`
  margin: 15px;
`

const Empty = styled.div`
  padding: 10px;
`