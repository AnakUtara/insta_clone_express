import { IService } from "../models/service.model";
import profileService from "../services/profile.service";
import { EntityController } from "./entity.controller";

class ProfileController extends EntityController {
	constructor(service: IService) {
		super(service);
	}
}

export default new ProfileController(profileService);
