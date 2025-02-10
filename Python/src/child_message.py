from child_channel import ChildChannel

class ChildMessage(object):
    """
    docstring
    """
    def __init__(self):
        """
        docstring
        """
        self.m_channel = ChildChannel()
        self.json_object = None
        self.m_function = None
        self.m_args = {}
        self.m_return = {}

    def m_return_reply(self):
        self.m_channel.reply(self.m_return)
        self.json_object = None
        self.m_function = None
        self.m_args = {}
        self.m_return = {}
