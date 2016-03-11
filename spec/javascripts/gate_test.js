describe("gates", function () {
    "use strict";

    var gates,
        ajax_spy;

    beforeEach(function () {
        setFixtures('<td>' +
        '<a data-gate-id="0c3a0328-ee73-48c6-a94a-a701d21a99b8-1" data-gate-name="1" data-gate-environment="1" action="open" class="js_gate_button btn btn-danger">Open</a>' +
        '<div id="0c3a0328-ee73-48c6-a94a-a701d21a99b8-1-button-timestamp" class="timestamp" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="2016-03-10 17:19:47+0100">5 seconds ago</div>' +
        '</td>');

        gates = o_p13n.tools.gates();

    });

    describe("toggle click", function () {

        beforeEach(function() {
            gates.init();
            ajax_spy = spyOn($, "ajax");
        });

        it("sends request", function () {
            $('.js_gate_button').trigger('click');
            expect(ajax_spy.calls.mostRecent().args[0]["type"]).toEqual("PUT");
            expect(ajax_spy.calls.mostRecent().args[0]["url"]).toEqual("/api/services/1/1");
        });
    });
});
