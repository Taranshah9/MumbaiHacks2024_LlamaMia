/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */

const Typography = ({ variant, children, className = '', ...props }) => {
  const baseStyles = {
    h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
    h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
    h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
    h4: "scroll-m-20 text-xl font-semibold tracking-tight",
    p: "leading-7 [&:not(:first-child)]:mt-6",
    blockquote: "mt-6 border-l-2 pl-6 italic",
    inlineCode: "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
    lead: "text-xl text-muted-foreground",
    large: "text-lg font-semibold",
    small: "text-sm font-medium leading-none",
    muted: "text-sm text-muted-foreground",
  };

  const TableComponent = () => (
    <div className="my-6 w-full overflow-y-auto">
      <table className="w-full">
        <thead>
          <tr className="m-0 border-t p-0 even:bg-muted">
            <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
              King's Treasury
            </th>
            <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
              People's happiness
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="m-0 border-t p-0 even:bg-muted">
            <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
              Empty
            </td>
            <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
              Overflowing
            </td>
          </tr>
          <tr className="m-0 border-t p-0 even:bg-muted">
            <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
              Modest
            </td>
            <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
              Satisfied
            </td>
          </tr>
          <tr className="m-0 border-t p-0 even:bg-muted">
            <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
              Full
            </td>
            <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
              Ecstatic
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const ListComponent = () => (
    <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
      <li>1st level of puns: 5 gold coins</li>
      <li>2nd level of jokes: 10 gold coins</li>
      <li>3rd level of one-liners : 20 gold coins</li>
    </ul>
  );

  switch (variant) {
    case 'h1':
      return <h1 className={`${baseStyles.h1} ${className}`} {...props}>{children}</h1>;
    case 'h2':
      return <h2 className={`${baseStyles.h2} ${className}`} {...props}>{children}</h2>;
    case 'h3':
      return <h3 className={`${baseStyles.h3} ${className}`} {...props}>{children}</h3>;
    case 'h4':
      return <h4 className={`${baseStyles.h4} ${className}`} {...props}>{children}</h4>;
    case 'p':
      return <p className={`${baseStyles.p} ${className}`} {...props}>{children}</p>;
    case 'blockquote':
      return <blockquote className={`${baseStyles.blockquote} ${className}`} {...props}>{children}</blockquote>;
    case 'table':
      return <TableComponent />;
    case 'list':
      return <ListComponent />;
    case 'inlineCode':
      return <code className={`${baseStyles.inlineCode} ${className}`} {...props}>{children}</code>;
    case 'lead':
      return <p className={`${baseStyles.lead} ${className}`} {...props}>{children}</p>;
    case 'large':
      return <div className={`${baseStyles.large} ${className}`} {...props}>{children}</div>;
    case 'small':
      return <small className={`${baseStyles.small} ${className}`} {...props}>{children}</small>;
    case 'muted':
      return <p className={`${baseStyles.muted} ${className}`} {...props}>{children}</p>;
    default:
      return <span>{children}</span>;
  }
};

export default Typography;