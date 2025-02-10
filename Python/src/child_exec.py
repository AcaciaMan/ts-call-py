from typing import Any
from child_message import ChildMessage

class ChildExec(object):
    """
    docstring
    """
    def __init__(self):
        """
        docstring
        """
        self.message: ChildMessage = None
        self.execs: str = None

    def __call__(self, *args: Any, **kwds: Any):
        """
        docstring
        """
        self.execs = None
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
        self.execs = None
        print('here', flush=True)
        self.execs = self.message.json_object['m_function']
        self.message.m_args = self.message.json_object['m_args']

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
        if (message.json_object is None):
            return ChildExec()
        
        childExecScript = ChildExecScript()
        childExecScript.message = message
        return childExecScript
        
 