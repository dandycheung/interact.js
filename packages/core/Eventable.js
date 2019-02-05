import * as arr from '@interactjs/utils/arr';
import extend from '@interactjs/utils/extend';
import normalize from '@interactjs/utils/normalizeListeners';
function fireUntilImmediateStopped(event, listeners) {
    for (const listener of listeners) {
        if (event.immediatePropagationStopped) {
            break;
        }
        listener(event);
    }
}
class Eventable {
    constructor(options) {
        this.types = {};
        this.propagationStopped = false;
        this.immediatePropagationStopped = false;
        this.options = extend({}, options || {});
    }
    fire(event) {
        let listeners;
        const global = this.global;
        // Interactable#on() listeners
        // tslint:disable no-conditional-assignment
        if ((listeners = this.types[event.type])) {
            fireUntilImmediateStopped(event, listeners);
        }
        // interact.on() listeners
        if (!event.propagationStopped && global && (listeners = global[event.type])) {
            fireUntilImmediateStopped(event, listeners);
        }
    }
    on(type, listener) {
        const listeners = normalize(type, listener);
        for (type in listeners) {
            this.types[type] = arr.merge(this.types[type] || [], listeners[type]);
        }
    }
    off(type, listener) {
        const listeners = normalize(type, listener);
        for (type in listeners) {
            const eventList = this.types[type];
            if (!eventList || !eventList.length) {
                continue;
            }
            for (const subListener of listeners[type]) {
                const index = eventList.indexOf(subListener);
                if (index !== -1) {
                    eventList.splice(index, 1);
                }
            }
        }
    }
}
export default Eventable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXZlbnRhYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiRXZlbnRhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxHQUFHLE1BQU0sdUJBQXVCLENBQUE7QUFDNUMsT0FBTyxNQUFNLE1BQU0sMEJBQTBCLENBQUE7QUFDN0MsT0FBTyxTQUFrQyxNQUFNLHNDQUFzQyxDQUFBO0FBR3JGLFNBQVMseUJBQXlCLENBQUUsS0FBb0IsRUFBRSxTQUE4QjtJQUN0RixLQUFLLE1BQU0sUUFBUSxJQUFJLFNBQVMsRUFBRTtRQUNoQyxJQUFJLEtBQUssQ0FBQywyQkFBMkIsRUFBRTtZQUFFLE1BQUs7U0FBRTtRQUVoRCxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUE7S0FDaEI7QUFDSCxDQUFDO0FBRUQsTUFBTSxTQUFTO0lBT2IsWUFBYSxPQUFrQztRQUwvQyxVQUFLLEdBQXdCLEVBQUUsQ0FBQTtRQUMvQix1QkFBa0IsR0FBRyxLQUFLLENBQUE7UUFDMUIsZ0NBQTJCLEdBQUcsS0FBSyxDQUFBO1FBSWpDLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLEVBQUUsRUFBRSxPQUFPLElBQUksRUFBRSxDQUFDLENBQUE7SUFDMUMsQ0FBQztJQUVELElBQUksQ0FBRSxLQUFVO1FBQ2QsSUFBSSxTQUFTLENBQUE7UUFDYixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFBO1FBRTFCLDhCQUE4QjtRQUM5QiwyQ0FBMkM7UUFDM0MsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFO1lBQ3hDLHlCQUF5QixDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQTtTQUM1QztRQUVELDBCQUEwQjtRQUMxQixJQUFJLENBQUMsS0FBSyxDQUFDLGtCQUFrQixJQUFJLE1BQU0sSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUc7WUFDNUUseUJBQXlCLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFBO1NBQzVDO0lBQ0gsQ0FBQztJQUVELEVBQUUsQ0FBRSxJQUFZLEVBQUUsUUFBK0I7UUFDL0MsTUFBTSxTQUFTLEdBQUcsU0FBUyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQTtRQUUzQyxLQUFLLElBQUksSUFBSSxTQUFTLEVBQUU7WUFDdEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO1NBQ3RFO0lBQ0gsQ0FBQztJQUVELEdBQUcsQ0FBRSxJQUFZLEVBQUUsUUFBK0I7UUFDaEQsTUFBTSxTQUFTLEdBQUcsU0FBUyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQTtRQUUzQyxLQUFLLElBQUksSUFBSSxTQUFTLEVBQUU7WUFDdEIsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUVsQyxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtnQkFBRSxTQUFRO2FBQUU7WUFFakQsS0FBSyxNQUFNLFdBQVcsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ3pDLE1BQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUE7Z0JBRTVDLElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQyxFQUFFO29CQUNoQixTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQTtpQkFDM0I7YUFDRjtTQUNGO0lBQ0gsQ0FBQztDQUNGO0FBRUQsZUFBZSxTQUFTLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBhcnIgZnJvbSAnQGludGVyYWN0anMvdXRpbHMvYXJyJ1xuaW1wb3J0IGV4dGVuZCBmcm9tICdAaW50ZXJhY3Rqcy91dGlscy9leHRlbmQnXG5pbXBvcnQgbm9ybWFsaXplLCB7IE5vcm1hbGl6ZWRMaXN0ZW5lcnMgfSBmcm9tICdAaW50ZXJhY3Rqcy91dGlscy9ub3JtYWxpemVMaXN0ZW5lcnMnXG5pbXBvcnQgSW50ZXJhY3RFdmVudCBmcm9tICcuL0ludGVyYWN0RXZlbnQnXG5cbmZ1bmN0aW9uIGZpcmVVbnRpbEltbWVkaWF0ZVN0b3BwZWQgKGV2ZW50OiBJbnRlcmFjdEV2ZW50LCBsaXN0ZW5lcnM6IEludGVyYWN0Lkxpc3RlbmVyW10pIHtcbiAgZm9yIChjb25zdCBsaXN0ZW5lciBvZiBsaXN0ZW5lcnMpIHtcbiAgICBpZiAoZXZlbnQuaW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkKSB7IGJyZWFrIH1cblxuICAgIGxpc3RlbmVyKGV2ZW50KVxuICB9XG59XG5cbmNsYXNzIEV2ZW50YWJsZSB7XG4gIG9wdGlvbnM6IGFueVxuICB0eXBlczogTm9ybWFsaXplZExpc3RlbmVycyA9IHt9XG4gIHByb3BhZ2F0aW9uU3RvcHBlZCA9IGZhbHNlXG4gIGltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZCA9IGZhbHNlXG4gIGdsb2JhbDogYW55XG5cbiAgY29uc3RydWN0b3IgKG9wdGlvbnM/OiB7IFtpbmRleDogc3RyaW5nXTogYW55IH0pIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBleHRlbmQoe30sIG9wdGlvbnMgfHwge30pXG4gIH1cblxuICBmaXJlIChldmVudDogYW55KSB7XG4gICAgbGV0IGxpc3RlbmVyc1xuICAgIGNvbnN0IGdsb2JhbCA9IHRoaXMuZ2xvYmFsXG5cbiAgICAvLyBJbnRlcmFjdGFibGUjb24oKSBsaXN0ZW5lcnNcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZSBuby1jb25kaXRpb25hbC1hc3NpZ25tZW50XG4gICAgaWYgKChsaXN0ZW5lcnMgPSB0aGlzLnR5cGVzW2V2ZW50LnR5cGVdKSkge1xuICAgICAgZmlyZVVudGlsSW1tZWRpYXRlU3RvcHBlZChldmVudCwgbGlzdGVuZXJzKVxuICAgIH1cblxuICAgIC8vIGludGVyYWN0Lm9uKCkgbGlzdGVuZXJzXG4gICAgaWYgKCFldmVudC5wcm9wYWdhdGlvblN0b3BwZWQgJiYgZ2xvYmFsICYmIChsaXN0ZW5lcnMgPSBnbG9iYWxbZXZlbnQudHlwZV0pKSAge1xuICAgICAgZmlyZVVudGlsSW1tZWRpYXRlU3RvcHBlZChldmVudCwgbGlzdGVuZXJzKVxuICAgIH1cbiAgfVxuXG4gIG9uICh0eXBlOiBzdHJpbmcsIGxpc3RlbmVyOiBJbnRlcmFjdC5MaXN0ZW5lcnNBcmcpIHtcbiAgICBjb25zdCBsaXN0ZW5lcnMgPSBub3JtYWxpemUodHlwZSwgbGlzdGVuZXIpXG5cbiAgICBmb3IgKHR5cGUgaW4gbGlzdGVuZXJzKSB7XG4gICAgICB0aGlzLnR5cGVzW3R5cGVdID0gYXJyLm1lcmdlKHRoaXMudHlwZXNbdHlwZV0gfHwgW10sIGxpc3RlbmVyc1t0eXBlXSlcbiAgICB9XG4gIH1cblxuICBvZmYgKHR5cGU6IHN0cmluZywgbGlzdGVuZXI6IEludGVyYWN0Lkxpc3RlbmVyc0FyZykge1xuICAgIGNvbnN0IGxpc3RlbmVycyA9IG5vcm1hbGl6ZSh0eXBlLCBsaXN0ZW5lcilcblxuICAgIGZvciAodHlwZSBpbiBsaXN0ZW5lcnMpIHtcbiAgICAgIGNvbnN0IGV2ZW50TGlzdCA9IHRoaXMudHlwZXNbdHlwZV1cblxuICAgICAgaWYgKCFldmVudExpc3QgfHwgIWV2ZW50TGlzdC5sZW5ndGgpIHsgY29udGludWUgfVxuXG4gICAgICBmb3IgKGNvbnN0IHN1Ykxpc3RlbmVyIG9mIGxpc3RlbmVyc1t0eXBlXSkge1xuICAgICAgICBjb25zdCBpbmRleCA9IGV2ZW50TGlzdC5pbmRleE9mKHN1Ykxpc3RlbmVyKVxuXG4gICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICBldmVudExpc3Quc3BsaWNlKGluZGV4LCAxKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEV2ZW50YWJsZVxuIl19