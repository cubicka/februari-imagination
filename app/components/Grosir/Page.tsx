import PageWithHeader from 'app/components/commons/PageWithHeader';

import Header from './Header';

export default (name: string) => PageWithHeader(Header(name));
// const Page: React.SFC<{ name: string }> = props => PageWithHeader(Header(props.name));
// export default Page;
