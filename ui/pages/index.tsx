import styles from '@/styles/Home.module.css';
import fetcher from '@/utils/fetcher';
import { Inter } from '@next/font/google';
import { GetServerSideProps } from 'next';
import useSwr from 'swr';

interface User {
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    confirmPassword(password: string): Promise<boolean>;
}

export default function Home({ fallbackData }: { fallbackData: User }) {
    const { data, error } = useSwr<User>(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/me`,
        fetcher,
        { fallbackData }
    );

    if (data) {
        return <div>Welcome! {data.name}</div>;
    }

    return <div>Please log in</div>;
}

// for the server side function to take in the headers along with it, we need to explicity send them along because these requests would be made from next's server and not from ours so the cookies are not present there.
export const getServerSideProps: GetServerSideProps = async (context) => {
    const data = await fetcher(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/me`,
        context.req.headers
    );
    return { props: { fallbackData: data } };
};
