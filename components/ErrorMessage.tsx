import { FunctionComponent } from 'react';

export const ErrorMessage: FunctionComponent<{ message: string }> = ({ message }) => (
  <aside>
    {message}
    <style jsx>{`
      aside {
        padding: 1.5em;
        font-size: 14px;
        color: white;
        background-color: red;
      }
    `}</style>
  </aside>
)
