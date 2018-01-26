--
-- Created by IntelliJ IDEA.
-- User: Arjan
-- Date: 26-1-2018
-- Time: 01:41
-- To change this template use File | Settings | File Templates.
--
if not component then
    if require then
        component = require("component")
    end
end
local internet = component.proxy(component.list(""))

local url = "http://wyvern.xyz:5432/code/get"
local code = "print(\"No Code Received\")"

function readRequest(request)
    while true do
        local data, reason = request.read()
        if not data then
            request.close()
            if reason then
                error(reason, 2)
            else
                return nil
            end
        elseif #data > 0 then
            return data
        end
        if os and os.sleep then
            os.sleep(0)
        end
    end
end

function getCode()
    local request, reason = internet.request(url)
    local rcode, succes, headers = request.response()

    if request then
        code = readRequest(request)
    end
end

getCode()
local f = load(code)
f()