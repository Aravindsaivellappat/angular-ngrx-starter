import { environment } from '../../../environments/environment';

export function getBaseUrl() {
    return environment.server_url;
}
