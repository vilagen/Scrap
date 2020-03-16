import React from 'react';
import { Container, Row, Col } from 'reactstrap';

export function NewsList({children}) {
  return <ul className="list-group">{children}</ul>
};

