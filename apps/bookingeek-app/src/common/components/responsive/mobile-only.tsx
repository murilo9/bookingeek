import styled from "styled-components";

const Element = styled.div`
  display: contents;

  @media screen and (min-width: 1024px) {
    display: none;
  }
`;

/**
 * A ghost container that only display its contents on mobile viewports.
 */
export default function MobileOnly({ children }: { children: JSX.Element }) {
  return <Element>{children}</Element>;
}
