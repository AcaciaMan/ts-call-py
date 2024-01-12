from typing import Any
from child_message import ChildMessage, ChildMessageType


class ChildExec(object):
    """
    docstring
    """
    def __init__(self):
        """
        docstring
        """
        self.message: ChildMessage = None
        self.execs: list = None

    def __call__(self, *args: Any, **kwds: Any):
        """
        docstring
        """
        self.execs = []
        return self
    
class ChildExecScript(ChildExec):
    """
    docstring
    """
    def __init__(self):
        """
        docstring
        """
        super().__init__()

    def __call__(self, *args: Any, **kwds: Any):
        """
        docstring
        """
        
        self.execs = []
        return self

class ChildExecFactory(object):
    """
    docstring
    """
    @staticmethod
    def create_child_exec(message: ChildMessage):
        """
        docstring
        """
        if 'type' in message.json_object:
            if message.json_object['type'] == ChildMessageType.python_script:
                childExecScript = ChildExecScript()
                childExecScript.message = message
                return childExecScript
        
        return ChildExec()