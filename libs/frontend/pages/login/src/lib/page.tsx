import { FrontEndPublicPath } from '@blubberfish/frontend/pages/routes';

export default () => {
    return (
        <div>
            LOGIN
            <a href={FrontEndPublicPath.NewUser}>New User</a>
        </div>
    );
};
