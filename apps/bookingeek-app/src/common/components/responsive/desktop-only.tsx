import styled from "styled-components";

const Element = styled.div`
  display: none;

  @media screen and (min-width: 1024px) {
    display: contents;
  }
`;

/**
 * A ghost container that only display its contents on desktop viewports.
 */
export default function DesktopOnly({ children }: { children: JSX.Element }) {
  return <Element>{children}</Element>;
}
