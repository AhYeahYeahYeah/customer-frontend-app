import axios from 'axios';
import axiosAdapterUniapp from 'axios-adapter-uniapp'
// const baseUrl = 'http://localhost';
const baseUrl = 'http://conductor.rinne.top';
const generalBackendPort = '10451';
const servicesBackendPort = '10452';
const conductorPort = '5000';
const version = 'v1';

const generalBackendBase = `${baseUrl}:${generalBackendPort}/${version}`;
const authBase = `${generalBackendBase}/auth`;
const entityBase = `${generalBackendBase}/entity`;
const robotUrl = 'https://aip.baidubce.com/rpc/2.0/unit/service/v3';
const conductorBase = `${baseUrl}:${conductorPort}/api`;

const servicesBackendBase = `${baseUrl}:${servicesBackendPort}/${version}`;
export const interestRate = `${servicesBackendBase}/data/interestrate`;
export const log = `${servicesBackendBase}/system/log`;
export const tag = `${servicesBackendBase}/regulation/tag`;
export const region = `${servicesBackendBase}/regulation/region`;
export const blacklist = `${servicesBackendBase}/regulation/blacklist`;
export const whitelist = `${servicesBackendBase}/regulation/whitelist`;
export const credential = `${servicesBackendBase}/examine/credential`;
export const profile = `${servicesBackendBase}/examine/profile`;
export const lock = `${servicesBackendBase}/storage/lock`;
export const unlock = `${servicesBackendBase}/storage/unlock`;
export const update = `${servicesBackendBase}/storage/update`;

function wait(ms = 500) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}

async function poll(fn, fnCondition, ms) {
	let count = 0;
	let result = await fn();
	while (fnCondition(result)) {
		// eslint-disable-next-line no-await-in-loop
		await wait(ms);
		// eslint-disable-next-line no-await-in-loop
		result = await fn();
		count += 1;
		if (count > 16) {
			break;
		}
	}
	return result;
}

export class AuthApi {
	constructor() {
		this.instance = axios.create({
			baseURL: `${authBase}/`,
			// timeout: 1050,
			headers: {
				Accept: 'application/json'
			},
			// #ifdef APP
			adapter: axiosAdapterUniapp
			// #endif
		});
	}

	async customerLogin(data) {
		return this.instance.post('/clogin', data);
	}

	async customerRegister(data) {
		return this.instance.post('/cregister', data);
	}

	async adminLogin(data) {
		return this.instance.post('/alogin', data);
	}

	async adminRegister(data) {
		return this.instance.post('/aregister', data);
	}
}

export class EntityApi {
	constructor(token) {
		this.instance = axios.create({
			baseURL: `${entityBase}/`,
			headers: {
				Accept: 'application/json',
				// Authorization: token
				Authorization: "eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NDkzMTk5NDcsImV4cCI6MTY0OTQwNjM0NywiYWNjb3VudCI6ImNtdGVzdCJ9.C_uSsYuVjc8pi4s_rgbWivQ4cUznry2pP6ZI9N5nKRc"
			},
			// #ifdef APP
			adapter: axiosAdapterUniapp
			// #endif
		});
	}

	// Product
	async getProducts() {
		return this.instance.get('/product');
	}

	async getProduct(pid) {
		return this.instance.get(`/product/${pid}`);
	}

	async addProduct(data) {
		return this.instance.post('/product', data);
	}

	async deleteProduct(pid) {
		return this.instance.delete(`/product/${pid}`);
	}

	async updateProduct(data) {
		return this.instance.put('/product', data);
	}

	// ServiceInfo
	async getServiceInfos() {
		return this.instance.get('/serviceinfo');
	}

	async getServiceInfo(sid) {
		return this.instance.get(`/serviceinfo/${sid}`);
	}

	// Admin
	async getAdmins() {
		return this.instance.get('/admin');
	}

	async getAdmin(aid) {
		return this.instance.get(`/admin/${aid}`);
	}

	async addAdmin(data) {
		return this.instance.post('/admin', data);
	}

	async updateAdmin(data) {
		return this.instance.put('/admin', data);
	}

	// Customer
	async getCustomers() {
		return this.instance.get('/customer');
	}

	async getCustomer(cid) {
		return this.instance.get(`/customer/${cid}`);
	}

	async addCustomer(data) {
		return this.instance.post('/customer', data);
	}

	async deleteCustomer(cid) {
		return this.instance.delete(`/customer/${cid}`);
	}

	async updateCustomer(data) {
		return this.instance.put('/customer', data);
	}

	// CustomerProfile
	async getCustomerProfiles() {
		return this.instance.get('/customerprofile');
	}

	async getCustomerProfile(cid) {
		return this.instance.get(`/customerprofile/${cid}`);
	}

	async addCustomerProfile(data) {
		return this.instance.post('/customerprofile', data);
	}

	async deleteCustomerProfile(cid) {
		return this.instance.delete(`/customerprofile/${cid}`);
	}

	async updateCustomerProfile(data) {
		return this.instance.put('/customerprofile', data);
	}

	// Whitelist
	async getWhitelists() {
		return this.instance.get('/whitelist');
	}

	async getWhitelist(wid) {
		return this.instance.get(`/whitelist/${wid}`);
	}

	async addWhitelist(data) {
		return this.instance.post('/whitelist', data);
	}

	async deleteWhitelist(wid) {
		return this.instance.delete(`/whitelist/${wid}`);
	}

	async updateWhitelist(data) {
		return this.instance.put('/whitelist', data);
	}

	// Blacklist
	async getBlacklists() {
		return this.instance.get('/blacklist');
	}

	async getBlacklist(bid) {
		return this.instance.get(`/blacklist/${bid}`);
	}

	async addBlacklist(data) {
		return this.instance.post('/blacklist', data);
	}

	async deleteBlacklist(bid) {
		return this.instance.delete(`/blacklist/${bid}`);
	}

	async updateBlacklist(data) {
		return this.instance.put('/blacklist', data);
	}

	// UserGroup
	async getUserGroups() {
		return this.instance.get('/usergroup');
	}

	async getUserGroup(gid) {
		return this.instance.get(`/usergroup/${gid}`);
	}

	async addUserGroup(data) {
		return this.instance.post('/usergroup', data);
	}

	async deleteUserGroup(gid) {
		return this.instance.delete(`/usergroup/${gid}`);
	}

	async updateUserGroup(data) {
		return this.instance.put('/usergroup', data);
	}

	// Order
	async getOrders() {
		return this.instance.get('/orders');
	}

	async getOrder(oid) {
		return this.instance.get(`/orders/${oid}`);
	}

	async addOrder(data) {
		return this.instance.post('/orders', data);
	}

	async updateOrder(data) {
		return this.instance.put('/orders', data);
	}

	async getByCustomer(cid) {
		return this.instance.get(`/orders/getByCustomer/${cid}`);
	}

	// WorkFlow
	async getWorkFlows() {
		return this.instance.get('/workflow');
	}

	async getWorkFlow(fid) {
		return this.instance.get(`/workflow/${fid}`);
	}

	async addWorkFlow(data) {
		return this.instance.post('/workflow', data);
	}

	async deleteWorkFlow(fid) {
		return this.instance.delete(`/workflow/${fid}`);
	}

	async updateWorkFlow(data) {
		return this.instance.put('/workflow', data);
	}

	// Star
	async addStar(data) {
		return this.instance.post('/star', data);
	}

	async deleteStar(sid) {
		return this.instance.delete(`/star/${sid}`);
	}

	async getStar(cid) {
		return this.instance.get(`/star/${cid}`);
	}
}

export class ConductorApi {
	startQuery = async (id) => {
		const fetchReport = () => axios.create({
			// #ifdef APP
			adapter: axiosAdapterUniapp
			// #endif
		}).get(`${conductorBase}/workflow/${id}`);
		const validate = (result) => result.data.status !== 'COMPLETED' && result.data.status !== 'FAILED';
		return poll(fetchReport, validate, 500);
	};

	setWorkFlow = async (workflow) => axios.create({
			// #ifdef APP
			adapter: axiosAdapterUniapp
			// #endif
		}).post(`${conductorBase}/metadata/workflow`, JSON.parse(workflow));
		
	// eslint-disable-next-line class-methods-use-this
	async getMetaDataWorkFlow(name) {
		return axios.create({
			// #ifdef APP
			adapter: axiosAdapterUniapp
			// #endif
		}).get(`${conductorBase}/metadata/workflow/${name}`);
	}
}

export class RobotApi {
    constructor() {
        this.instance = axios.create({
            baseURL: `${robotUrl}/`,
            // timeout: 1050,
            headers: { Accept: 'application/json' },
			adapter: axiosAdapterUniapp
        });
    }

    async sendMsg(data) {
        return this.instance.post('/chat?access_token=24.2fa0f9c1715de922b9ae0e0657735499.2592000.1651908606.282335-25826498', data);
    }
}