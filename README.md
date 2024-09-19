## 프로젝트: Todo List with docker

<br/>

## 구조 설계

<img width="600" alt="image" src="https://github.com/user-attachments/assets/14e39b4e-b293-4c9a-bfee-61c0b287c1d0">


<br/>
<br/>

## 스크린샷

<img width="400" alt="image" src="https://github.com/user-attachments/assets/73bcb40a-6e07-40bd-9e00-5476c763aee4">

<br/>

<img width="400" alt="image" src="https://github.com/user-attachments/assets/b903f3e1-93f9-4ecc-891a-b80afe238b39">


<br/>
<br/>
<br/>

## 배운 부분
1. [인터페이스를 사용했을 때 의존성 주입 트러블 슈팅](#인터페이스를-사용했을-때-의존성-주입-트러블-슈팅)
2. [Symbol을 이용한 의존성 주입 방법](#symbol을-이용한-의존성-주입-방법)
3. [인터페이스를 사용할 경우 두가지 의존성 주입 방법 비교](인터페이스를-사용할-경우-두가지-의존성-주입-방법-비교)
4. [도커의 유용성](#도커-유용성)

<br/>
<br/>

### 인터페이스를 사용했을 때 의존성 주입 트러블 슈팅

<img width="400" alt="image" src="https://github.com/user-attachments/assets/30ee6116-25e7-4c87-9106-74dcd07d57b2">


- TypeScript에서는 인터페이스가 런타임에 존재하지 않기 때문에, NestJS의 DI 컨테이너에서 의존성 주입 토큰으로 사용할 수 없다.
- 왜냐하면 노드는 자바스크립트를 실행하지 타입스크립트를 실행하지 않기 때문이다. 타입스크립트 코드는 전부 자바스크립트로 변환되며 변환 과정에는 타입스크립트 고유 문법인 인터페이스는 삭제된다.
- 따라서 추상 클래스를 사용하여 인터페이스처럼 동작하면서도 런타임에 존재하도록 한다.

<br/>

### Symbol을 이용한 의존성 주입 방법

- 앞서 인터페이스 대신 추상클래스를 이용한 주입을 알아보았다면 또다른 방법인 Symbol을 통해 의존성 주입을 알아보자
- TypeScript의 **Symbol**을 사용하여 의존성 주입 시 런타임에서 고유성을 보장할 수 있다. 

```typescript
// src/task/constants.ts
export const TASK_SERVICE = Symbol('ITaskService');

// src/task/task.module.ts
import { Module } from '@nestjs/common';
import { TASK_SERVICE } from './constants';
import { TaskService } from './task.service';

@Module({
  providers: [
    {
      provide: TASK_SERVICE,
      useClass: TaskService,
    },
  ],
  exports: [TASK_SERVICE],
})
export class TaskModule {}

// 서비스에서 주입
// src/task/task.controller.ts
import { Inject } from '@nestjs/common';
import { TASK_SERVICE } from './constants';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(
    @Inject(TASK_SERVICE) private readonly taskService: TaskService,
  ) {}
}
```

<br/>

### 인터페이스를 사용할 경우 두가지 의존성 주입 방법 비교 

| 비교 항목           | Symbol 주입                               | 추상 클래스 주입                         |
|---------------------|------------------------------------------|------------------------------------------|
| **타입 안전성**      | 직접적인 타입 안전성 보장 없음            | 타입 안전성을 보장 (컴파일 타임 검사)    |
| **고유성**          | 고유한 값으로 의존성 충돌 방지 가능       | 고유성 보장 없음                         |
| **동적 생성**       | 런타임에 동적으로 생성 가능               | 고정된 정의, 동적 생성 불가               |
| **런타임 존재 여부** | 런타임에 존재하지 않음                    | 런타임에 존재 (무거울 수 있음)           |
| **추상화된 로직**    | 단순 고유값 역할만 수행                  | 기본 메서드 정의 가능, 더 복잡한 로직 처리 |
| **대규모 프로젝트**  | 고유성 보장이 필요할 때 유리              | 여러 서비스에서 사용 시 충돌 가능        |


- **Symbol**: 고유성이 필요하거나 대규모 프로젝트에서 의존성 충돌을 방지할 때 유리하다.
- **추상 클래스**: 타입 안전성과 구조의 명확성을 중시할 때 적합하다.(**MSA(Microservices Architecture)**와 같은 분산된 환경에서 의존성 충돌을 방지하는 데 용이)
- 내가 생각하기에 심볼을 쓰면 IDE에 자동완성 기능 사용을 못한다는 점이 너무 치명적이라 추상클래스를 통한 의존성 주입을 선택했다.

<br/>

### 도커 유용성
- 도커가 아니였다면 npm, postgreSQL 등등 로컬에 따로 셋팅하는 작업을 했어야했는데 갓 도커로 한 방에 해결해버렸다.
- 쓰면서 특히 플러터 같은 멀티플랫폼 환경에 빨리 적용해보고 싶다는 마음이 들었다. 이전에 안드로이드 스튜디오에서는 돌아가는데 VSCode에서 안돌아가는 문제, iOS버전이 자꾸 안맞아서 프로젝트를 새로받으면 다시 셋팅해주어야하는 문제를 도커로 아주 깔끔하게 문제를 해결할 수 있겠다는 생각이 들었다.
