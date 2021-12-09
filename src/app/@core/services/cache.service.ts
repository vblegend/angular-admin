import { Injectable, Injector } from '@angular/core';
import { LocalCache } from '@core/cache/local.cache';
import { RouteTitle } from '@core/models/RouteTitle';
import { SchedulingTask } from 'app/pages/tasks/task-model/tasks.model';

/**
 * 数据缓存服务 
 */
@Injectable({
    providedIn: 'root'
})
export class CacheService {
    public readonly tasks: LocalCache<SchedulingTask, number>;



    constructor(protected injector: Injector) {
        this.tasks = new LocalCache<SchedulingTask, number>('route.1', e => e.taskId);


    }




}