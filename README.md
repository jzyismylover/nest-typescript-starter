> nest 目录结构
```text
nodejs
├── package.json
├── README.md
├── src
│   │   └── constants（全局常量定义）
│   │       ├──common.constants.ts
│   │   └── utils（常用工具类）
│   │       ├──http.util.ts
│   │       └──file.util.ts
│   ├── app.module.ts（模块配置文件）
│   ├── common （通用模块，包含自定义装饰器、过滤器、守卫、拦截器、中间件）
│   │   ├── decorators （项目通用装饰器）
│   │   │   └── roles.decorator.ts
│   │   ├── filters （过滤器）
│   │   │   └── http-exception.filter.ts
│   │   ├── guards （守卫）
│   │   │   └── roles.guard.ts
│   │   ├── interceptors （拦截器）
│   │   │   ├── exception.interceptor.ts
│   │   │   ├── logging.interceptor.ts
│   │   ├── middleware （中间件）
│   │   │   └── logger.middleware.ts
│   │   └── pipes （管道，主要用于数据验证和类型转换）
│   │       ├── parse-int.pipe.ts
│   │       └── validation.pipe.ts
│   ├── config （配置文件信息）
│   │   ├── database.ts
│   │   ├── redis.ts
│   ├── jobs （高并发场景下队列处理）
│   ├── main.ts （入口文件）
│   ├── modules （业务代码，按目录区分模块）
│   │   ├── hello
│   │   │   ├── hello.controller.ts
│   │   │   ├── hello.module.ts
│   │   │   └── hello.service.ts
│   │   └── users
│   │   │   ├── dto （数据传输对象定义）
│   │   │   │   └── users.create.dto.ts
│   │   │   │   └── users.update.dto.ts
│   │       ├── users.controller.ts （控制层）
│   │       ├── users.entity.ts （映射数据库模型对象）
│   │       ├── users.module.ts (模块定义）
│   │       └── users.service.ts （service层）
│   ├── tasks （定时任务）
│   │   ├── tasks.module.ts
│   │   └── tasks.service.ts
│   └── templates （页面模板）
├── test （单元测试）
│   ├── app.e2e-spec.ts
├── tsconfig.json
```

> 常用的一些 HTTP 异常

    400 BadRequestException
    401 UnauthorizedException
    403 ForbiddenException
    404 NotFoundException
    406 NotAcceptableException
    408 RequestTimeoutException
    409 ConflictException
    410 GoneException
    413 PayloadTooLargeException
    415 UnsupportedMediaTypeException
    500 InternalServerErrorException
    501 NotImplementedException
    502 BadGatewayException
    503 ServiceUnavailableException
    504 GatewayTimeoutException

> 常见的内置管道：在 controller 进行处理前对数据进行过滤，假如发生异常则交由异常过滤器处理
> 
    ValidationPipe
    ParseIntPipe
    ParseFloatPipe
    ParseBoolPipe
    ParseArrayPipe
    ParseUUIDPipe
    ParseEnumPipe
    DefaultValuePipe
    ParseFilePipe

> docker-compose version
> 
    compose版本	| docker版本
    3.4	| 17.09.0+
    3.3	| 17.06.0+
    3.2	| 17.04.0+
    3.1	| 1.13.1+
    3.0	| 1.13.0+
    2.3	| 17.06.0+
    2.2	| 1.13.0+