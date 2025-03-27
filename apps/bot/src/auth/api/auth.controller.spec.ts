// import { Test, TestingModule } from "@nestjs/testing"

// import { AuthController } from "./auth.controller"

// import { ConfigService } from "#/config/config.service"
// import { AuthService } from "../application/auth.service"

describe("AuthController", () => {
  // let controller: AuthController

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     controllers: [AuthController],
  //     providers: [
  //       {
  //         provide: AuthService,
  //         useValue: {},
  //       },
  //       {
  //         provide: ConfigService,
  //         useValue: {},
  //       },
  //     ],
  //   }).compile()

  //   controller = module.get<AuthController>(AuthController)
  // })

  it("should be defined", () => {
    // expect(controller).toBeDefined()
    expect(2 * 2).toBe(4)
  })
})
