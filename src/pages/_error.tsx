import { Button, Result } from 'antd';
import { GetServerSidePropsContext, NextApiResponse } from 'next';
import { ErrorProps } from 'next/error';
import { useRouter } from 'next/router';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { res, resolvedUrl } = ctx;
  const statusCode = res ? res.statusCode : 500;

  if (resolvedUrl === '/') {
    return {
      redirect: {
        destination: '/login'
      }
    };
  }

  return { props: { resolvedUrl, statusCode } };
};

const Error = (props: { resolvedUrl: string; statusCode: number }) => {
  const router = useRouter();

  if (props?.statusCode === 404) {
    return (
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button
            type="primary"
            onClick={() => {
              router.push('/documents');
            }}
          >
            Back Home
          </Button>
        }
      />
    );
  }

  return (
    <Result
      status="500"
      title="500"
      subTitle="Sorry, something went wrong."
      extra={
        <Button
          onClick={() => {
            router.push('/documents');
          }}
          type="primary"
        >
          Back Home
        </Button>
      }
    />
  );
};

export default Error;
